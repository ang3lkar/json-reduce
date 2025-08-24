# JSON Reduce

[![Tests](https://github.com/ang3lkar/json-reduce/workflows/Run%20Tests/badge.svg)](https://github.com/ang3lkar/spoti3/actions) [![Version](https://img.shields.io/github/package-json/v/ang3lkar/json-reduce)](https://github.com/ang3lkar/spoti3) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A simple VS Code extension that aims to ease readability for developers when dealing with large JSON files. It reduces the JSON to a minimal size so they can focus on the schema and avoid infinite scrolling when having extremely large number of array objects or huge texts.

## Example

Text is reduced to a configurable number of characters. Array items are reduced to a configurable number of items.

```json
{
  "someText": "Lorem Ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos...",
  "someArray": [
    {
      "someObject": {
        "someText": "Lorem Ipsum dolor sit amet"
      },
      "someObject2": {
        "someText": "Lorem Ipsum dolor sit amet"
      }
    },
    "<135 more items>"
  ]
}
```

## Configuration

```json
{
  "jsonReduce.textLength": 100,
  "jsonReduce.arrayLength": 10
}
```

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Run the tests
5. Submit a pull request

## License

MIT © [Ang3lkar](https://github.com/ang3lkar)
