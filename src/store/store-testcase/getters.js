export function testProcedures(state) {
  const testCases = state.testCases;
  const userTests = state.test;

  if (testCases) {
    const testProcedure = [];

    for (const test in testCases) {
      if (userTests.includes(test)) {
        testProcedure.push({
          testID: test,
          testProcedure: testCases[test]["TestProcedure"]
        });
      }
    }
    return testProcedure;
  }
}
