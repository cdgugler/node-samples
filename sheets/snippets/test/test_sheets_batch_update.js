/**
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const expect = require('expect');
const Helpers = require('./helpers');
const SheetsBatchUpdate = require('../sheets_batch_update');

describe('Spreadsheet batch update snippet', () => {
  const helpers = new Helpers();

  after(() => {
    return helpers.cleanup();
  });

  it('should batch update a spreadsheet', (async () => {
    const spreadsheetId = await helpers.createTestSpreadsheet();
    await helpers.populateValues(spreadsheetId);
    const result = await SheetsBatchUpdate.batchUpdate(spreadsheetId,
        'New Title', 'Hello', 'Goodbye');
    const replies = result.data.replies;
    expect(replies.length).toBe(2);
    const findReplaceResponse = replies[1].findReplace;
    expect(findReplaceResponse.occurrencesChanged).toBe(100);
  }));
});
