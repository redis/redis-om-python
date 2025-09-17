"""
Tests for enhanced migration CLI commands.

Tests the new CLI features including verification, statistics, and enhanced status.
"""

import os
import tempfile
from unittest.mock import AsyncMock, patch

import pytest
from click.testing import CliRunner

from aredis_om.model.cli.migrate_data import migrate_data
from aredis_om.model.migrations.data_migrator import DataMigrator

from .conftest import py_test_mark_asyncio


def test_migrate_data_status_detailed():
    """Test the detailed status command."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        # Mock the migrator and its methods
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock status response
            mock_migrator.status.return_value = {
                "total_migrations": 2,
                "applied_count": 1,
                "pending_count": 1,
                "applied_migrations": ["001_datetime_fields_to_timestamps"],
                "pending_migrations": ["002_future_migration"],
            }

            # Mock discover_migrations for detailed info
            mock_migration1 = AsyncMock()
            mock_migration1.migration_id = "001_datetime_fields_to_timestamps"
            mock_migration1.description = "Convert datetime fields to timestamps"
            mock_migration1.dependencies = []
            mock_migration1.can_run.return_value = True

            mock_migration2 = AsyncMock()
            mock_migration2.migration_id = "002_future_migration"
            mock_migration2.description = "Future migration"
            mock_migration2.dependencies = ["001_datetime_fields_to_timestamps"]
            mock_migration2.can_run.return_value = True

            mock_migrator.discover_migrations.return_value = {
                "001_datetime_fields_to_timestamps": mock_migration1,
                "002_future_migration": mock_migration2,
            }

            # Test detailed status
            result = runner.invoke(
                migrate_data, ["status", "--migrations-dir", temp_dir, "--detailed"]
            )

            assert result.exit_code == 0
            assert "Migration Status:" in result.output
            assert "✅ Applied migrations:" in result.output
            assert "⚠️  Pending migrations:" in result.output
            assert "Detailed Migration Information:" in result.output
            assert "Convert datetime fields to timestamps" in result.output
            assert "Dependencies: None" in result.output


def test_migrate_data_verify_command():
    """Test the verify command."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock status response
            mock_migrator.status.return_value = {
                "total_migrations": 1,
                "applied_count": 1,
                "pending_count": 0,
                "applied_migrations": ["001_datetime_fields_to_timestamps"],
                "pending_migrations": [],
            }

            # Mock verification response
            mock_migrator.verify_data_integrity.return_value = {
                "success": True,
                "issues": [],
                "checked_keys": 100,
                "total_issues": 0,
            }

            result = runner.invoke(
                migrate_data, ["verify", "--migrations-dir", temp_dir, "--check-data"]
            )

            assert result.exit_code == 0
            assert "Migration Verification Report:" in result.output
            assert "✅ All migrations are applied." in result.output
            assert "✅ Data integrity checks passed." in result.output


def test_migrate_data_verify_with_issues():
    """Test the verify command when issues are found."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock status with pending migrations
            mock_migrator.status.return_value = {
                "total_migrations": 2,
                "applied_count": 1,
                "pending_count": 1,
                "applied_migrations": ["001_datetime_fields_to_timestamps"],
                "pending_migrations": ["002_future_migration"],
            }

            # Mock verification with issues
            mock_migrator.verify_data_integrity.return_value = {
                "success": False,
                "issues": [
                    "Key test:123, field created_at: Expected timestamp, got str: 2023-01-01",
                    "Key test:456, field birth_date: Invalid timestamp value: -1",
                ],
                "checked_keys": 100,
                "total_issues": 2,
            }

            result = runner.invoke(
                migrate_data, ["verify", "--migrations-dir", temp_dir, "--check-data"]
            )

            assert result.exit_code == 0
            assert "⚠️  Pending migrations found:" in result.output
            assert "❌ Data integrity issues found:" in result.output
            assert "Expected timestamp, got str" in result.output


def test_migrate_data_stats_command():
    """Test the stats command."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock statistics response
            mock_migrator.get_migration_statistics.return_value = {
                "total_models": 5,
                "models_with_datetime_fields": 2,
                "total_datetime_fields": 4,
                "estimated_keys_to_migrate": 1500,
                "model_details": [
                    {
                        "model_name": "User",
                        "model_type": "HashModel",
                        "datetime_fields": ["created_at", "last_login"],
                        "key_count": 1000,
                    },
                    {
                        "model_name": "Order",
                        "model_type": "JsonModel",
                        "datetime_fields": ["order_date", "shipped_date"],
                        "key_count": 500,
                    },
                ],
            }

            result = runner.invoke(
                migrate_data, ["stats", "--migrations-dir", temp_dir]
            )

            assert result.exit_code == 0
            assert "Migration Statistics:" in result.output
            assert "Total models in registry: 5" in result.output
            assert "Models with datetime fields: 2" in result.output
            assert "Estimated keys to migrate: 1500" in result.output
            assert "📊 User (HashModel)" in result.output
            assert "📊 Order (JsonModel)" in result.output
            assert "Estimated migration time:" in result.output


def test_migrate_data_stats_with_large_dataset_warnings():
    """Test stats command with large dataset warnings."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock statistics with large datasets
            mock_migrator.get_migration_statistics.return_value = {
                "total_models": 2,
                "models_with_datetime_fields": 2,
                "total_datetime_fields": 2,
                "estimated_keys_to_migrate": 25000,
                "model_details": [
                    {
                        "model_name": "LargeModel",
                        "model_type": "HashModel",
                        "datetime_fields": ["created_at"],
                        "key_count": 20000,  # Large dataset
                    },
                    {
                        "model_name": "MediumModel",
                        "model_type": "JsonModel",
                        "datetime_fields": ["updated_at"],
                        "key_count": 5000,  # Medium dataset
                    },
                ],
            }

            result = runner.invoke(
                migrate_data, ["stats", "--migrations-dir", temp_dir]
            )

            assert result.exit_code == 0
            assert "⚠️  Large dataset - consider batch processing" in result.output
            assert "ℹ️  Medium dataset - monitor progress" in result.output


def test_migrate_data_run_with_enhanced_options():
    """Test the run command with enhanced error handling options."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock pending migrations
            mock_migration = AsyncMock()
            mock_migration.migration_id = "001_datetime_fields_to_timestamps"
            mock_migration.description = "Convert datetime fields"

            mock_migrator.get_pending_migrations.return_value = [mock_migration]
            mock_migrator.run_migrations.return_value = 1

            result = runner.invoke(
                migrate_data,
                [
                    "run",
                    "--migrations-dir",
                    temp_dir,
                    "--failure-mode",
                    "log_and_skip",
                    "--batch-size",
                    "500",
                    "--max-errors",
                    "10",
                    "--yes",  # Skip confirmation
                ],
            )

            assert result.exit_code == 0
            # Verify the migrator was called
            mock_migrator.run_migrations.assert_called_once()


def test_migrate_data_stats_error_handling():
    """Test stats command error handling."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock error response
            mock_migrator.get_migration_statistics.return_value = {
                "error": "Failed to connect to Redis",
                "total_models": 0,
                "models_with_datetime_fields": 0,
                "total_datetime_fields": 0,
                "estimated_keys_to_migrate": 0,
                "model_details": [],
            }

            result = runner.invoke(
                migrate_data, ["stats", "--migrations-dir", temp_dir]
            )

            assert result.exit_code == 0
            assert "❌ Error: Failed to connect to Redis" in result.output


def test_migrate_data_verify_without_data_check():
    """Test verify command without data integrity check."""
    runner = CliRunner()

    with tempfile.TemporaryDirectory() as temp_dir:
        with patch(
            "aredis_om.model.cli.migrate_data.DataMigrator"
        ) as mock_migrator_class:
            mock_migrator = AsyncMock()
            mock_migrator_class.return_value = mock_migrator

            # Mock status response
            mock_migrator.status.return_value = {
                "total_migrations": 1,
                "applied_count": 1,
                "pending_count": 0,
                "applied_migrations": ["001_datetime_fields_to_timestamps"],
                "pending_migrations": [],
            }

            result = runner.invoke(
                migrate_data,
                [
                    "verify",
                    "--migrations-dir",
                    temp_dir,
                    # No --check-data flag
                ],
            )

            assert result.exit_code == 0
            assert "Migration Verification Report:" in result.output
            assert "✅ All migrations are applied." in result.output
            # Should not perform data integrity checks
            assert "Performing data integrity checks" not in result.output
            mock_migrator.verify_data_integrity.assert_not_called()
