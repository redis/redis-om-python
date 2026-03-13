# Redis OM Python 1.1 Release Notes

Redis OM Python 1.1 focuses on compatibility updates and timestamp normalization fixes.

## Notable Changes

- RedisVL dependency updated to allow newer Python versions
- `datetime.datetime` values now round-trip as UTC-aware datetimes
- `datetime.date` values now store as midnight UTC instead of local-midnight timestamps

## Timestamp Upgrade Note

The timestamp normalization change is important if you already have data written by earlier releases:

- Existing `datetime.datetime` records still represent the same instant in time, but code that expected naive datetimes may need to handle UTC-aware values.
- Existing `datetime.date` records written in a non-UTC environment may load as a different calendar day after upgrading.
- Date equality queries may stop matching those older records until the data is re-saved or migrated.

For migration guidance, see [Migrations: Datetime Timezone Normalization in 1.1.0](migrations.md#datetime-timezone-normalization-in-110).
