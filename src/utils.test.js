import {getPrettierOptionsFromESLintRules} from './utils'

const getPrettierOptionsFromESLintRulesTests = [
  {
    rules: {
      'max-len': [2, 120, 2],
      indent: [2, 2, {SwitchCase: 1}],
      quotes: [2, 'single', {avoidEscape: true, allowTemplateLiterals: true}],
      'comma-dangle': [
        2,
        {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        },
      ],
    },
    options: {
      printWidth: 120,
      tabWidth: 2,
      parser: 'babylon',
      singleQuote: true,
      trailingComma: true,
      bracketSpacing: false,
    },
  },
  {rules: {'max-len': 2}, options: {printWidth: 80}},
  {rules: {'comma-dangle': [2, 'never']}, options: {trailingComma: false}},
  // prettier doesn't allow tabs,
  // so we'll just go with the default and let eslint fix it
  {rules: {indent: [2, 'tab']}, options: {tabWidth: 2}},
]

getPrettierOptionsFromESLintRulesTests.forEach(({rules, options}, index) => {
  test(`getPrettierOptionsFromESLintRulesTests ${index}`, () => {
    const actualOptions = getPrettierOptionsFromESLintRules({rules})
    expect(actualOptions).toMatchObject(options)
  })
})

test('if prettierOptions are provided, those are preferred', () => {
  const actualOptions = getPrettierOptionsFromESLintRules(
    {rules: {quotes: [2, 'single']}},
    {singleQuote: false},
  )
  expect(actualOptions).toMatchObject({singleQuote: false})
})
