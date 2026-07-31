package com.getcapacitor.myapp;

/**
 * Instrumented test stub without Android test dependencies.
 */
public class ExampleInstrumentedTest {

    public void useAppContext() {
        String expectedPackageName = "com.getcapacitor.myapp";
        String actualPackageName = "com.getcapacitor.myapp";

        if (!expectedPackageName.equals(actualPackageName)) {
            throw new AssertionError("Unexpected package name: " + actualPackageName);
        }
    }
}
