# RulesEngine

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Project Structure

- Split into 3 main components, `data-table`, `form-input`, and `rules-display-list`
  - `data-table` is the main component that renders the tableData and also watches for changes to filtering rules
  - `form-input` houses all the input components required to collect user input via dropdown and text inputs
  - `rules-display-list` is a sample UI to indicate to user what rules are being currently applied to the data-table view
- Shared components are placed within `shared-services`, which include values that are used by multiple components
  - `table-header-data-service` takes the tableData that is loaded and generates the headers.
    - These same headers are used as optionData to indicate which column the user wants to filter on
  - `rules-store-service` stores all the rules that the user has generated, to be used across other components

## Application Logic

- User input is mainly collected within `form-input` component
- Rules logic processing is done within `applyFilters` method found in `data-table-component`
  - Ideally, this should have been abstracted out into a separate util function to keep separation of concerns and to keep business logic out of UI components
- @todo tags added at various parts of the application to indicate places where further clarification on business logic is required with business owner
