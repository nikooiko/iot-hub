# This is the client Application
## Basic Technologies
* React
* Redux
* Material

## Structure - Breakdown
The ***Generic*** folder contains as the name implies the application basic
functionality:
* The **app** component
* The **routes**
* The **actions** that indexes all application's actions
* The **reducers** that indexes all application's reducers
* The **types** that indexes all application's types
* The **store** that contains the store configuration

The ***Shared*** folder contains various shared components (ex footer, notFoundPage, etc...)

All the other folders contain the various application features.

Each ***feature*** might contain a basic component-container (see [**redux**](http://redux.js.org/)),
*reducers*, *actions*, *types* and *sub-features* (following the same structure as parent).

