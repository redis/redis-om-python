import os
import re
from pathlib import Path

import unasync

ADDITIONAL_REPLACEMENTS = {
    "aredis_om": "redis_om",
    "async_redis": "sync_redis",
    ":tests.": ":tests_sync.",
    "pytest_asyncio": "pytest",
    "py_test_mark_asyncio": "py_test_mark_sync",
    "AsyncMock": "Mock",
}


def main():
    rules = [
        unasync.Rule(
            fromdir="/aredis_om/",
            todir="/redis_om/",
            additional_replacements=ADDITIONAL_REPLACEMENTS,
        ),
        unasync.Rule(
            fromdir="/tests/",
            todir="/tests_sync/",
            additional_replacements=ADDITIONAL_REPLACEMENTS,
        ),
    ]
    filepaths = []
    for root, _, filenames in os.walk(Path(__file__).absolute().parent):
        for filename in filenames:
            if filename.rpartition(".")[-1] in (
                "py",
                "pyi",
            ):
                filepaths.append(os.path.join(root, filename))

    unasync.unasync_files(filepaths, rules)
    
    # Post-process CLI files to remove run_async() wrappers
    cli_files = [
        "redis_om/model/cli/migrate_data.py",
        "redis_om/model/cli/migrate.py"
    ]
    
    for cli_file in cli_files:
        file_path = Path(__file__).absolute().parent / cli_file
        if file_path.exists():
            with open(file_path, 'r') as f:
                content = f.read()
            
            # Remove run_async() call wrappers (not the function definition)
            # Only match run_async() calls that are not function definitions
            def remove_run_async_call(match):
                inner_content = match.group(1)
                return inner_content
            
            # Pattern to match run_async() function calls (not definitions)
            # Look for = or return statements followed by run_async(...)
            lines = content.split('\n')
            new_lines = []
            
            for line in lines:
                # Skip function definitions
                if 'def run_async(' in line:
                    new_lines.append(line)
                    continue
                    
                # Replace run_async() calls
                if 'run_async(' in line and ('=' in line or 'return ' in line or line.strip().startswith('run_async(')):
                    # Simple pattern for function calls
                    line = re.sub(r'run_async\(([^)]+(?:\([^)]*\)[^)]*)*)\)', r'\1', line)
                
                new_lines.append(line)
                
            content = '\n'.join(new_lines)
            
            with open(file_path, 'w') as f:
                f.write(content)


if __name__ == "__main__":
    main()
