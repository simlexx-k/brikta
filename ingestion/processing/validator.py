from great_expectations.core import ExpectationSuite, ExpectationConfiguration

def validate_data(df):
    """Apply data quality checks"""
    expectation_suite = ExpectationSuite(
        expectation_suite_name="ingestion_checks"
    )
    
    # Example expectations
    expectation_suite.add_expectation(
        ExpectationConfiguration(
            expectation_type="expect_column_values_to_not_be_null",
            kwargs={"column": "id"}
        )
    )
    
    # Needs additional expectations
    expectation_suite.add_expectation(
        ExpectationConfiguration(
            expectation_type="expect_column_values_to_be_between",
            kwargs={"column": "age", "min_value": 0, "max_value": 120}
        )
    )
    expectation_suite.add_expectation(
        ExpectationConfiguration(
            expectation_type="expect_column_values_to_match_regex",
            kwargs={"column": "email", "regex": r"^[^@]+@[^@]+\.[^@]+$"}
        )
    )
    
    # Add data type checks, format validations, etc.
    expectation_suite.add_expectation(
        ExpectationConfiguration(
            expectation_type="expect_column_values_to_be_of_type",
            kwargs={"column": "transaction_date", "type": "datetime64[ns]"}
        )
    )
    expectation_suite.add_expectation(
        ExpectationConfiguration(
            expectation_type="expect_column_values_to_be_unique",
            kwargs={"column": "transaction_id"}
        )
    )
    
    # Run validation
    validation_result = df.validate(expectation_suite)
    return validation_result
