export function testHeaders(state) {
  const testCases = state.testCases;

  if (testCases) {
    const headers = [];

    for (const test in testCases) {
      headers.push(testCases[test]["TestHeading"]);
    }
    const testHeaders = [...new Set(headers)];
    return testHeaders;
  }
}

export function testCases(state, getters) {
  const testList = state.testCases;
  const headers = getters.testHeaders;

  if (testList && headers) {
    const testCases = {};
    testCases.label = "Test Case";
    const children = [];

    for (const header of headers) {
      const node = {};
      node.label = header;
      node.children = [];

      for (const test in testList) {
        if (header === testList[test]["TestHeading"]) {
          const testId = {};
          testId.label = test;
          node.children.push(testId);
        }
      }
      children.push(node);
    }
    testCases.children = children;

    const treeTestCase = [];
    treeTestCase.push(testCases);
    return treeTestCase;
  }
}
