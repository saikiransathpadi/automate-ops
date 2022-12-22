
# Guidelines

## General
* function/class names should specify the exact functinality.
* Place common function in utils folder in respective file to use it any where.
* Always modularize and never write longer function, modularize them to be readable and maintainable.
* Create respective type interfaces every where to avoid unnecessary errors.
* Use **.d.ts for interface or type related files.

## Client (React Best Practices)

* Always creating newer modules in typescript instead of plain old javascript (.tsx for React components, .ts for helpers, utils etc..).
* Avoid creating new class components. Use functional component instead and for managing a lifecycle and state use a hook or prefer create a custom hook.
* Use `React.memo` for functional components to prevent re-renders. You can also use its second parameter to stop unwanted state changes from affecting your component.
* Avoid mutating any kind of state. Avoid JavaScript APIs that mutate a given variable.
* Use a combination of useApi (custom hook need to be added) and custom contexts to fetch and exchange data.
* Prefer SCSS modules over CSS and avoid style component.
* Try to use storybooks for UI review of components
* Avoid prop-drilling. Use contexts instead.
* Do not import 'lodash' directly. Import the function you need. Eg `import get from 'lodash/get';`
* If you want to render some component conditionally, don't write conditions inside render method of the parent component, move the condition inside the child component.
* Avoid nested ternary or switch. Use Object Literal instead. Ref: [`Link`](https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals)
* Always add/update/modify the unit test for the components. Ref: [`Link1`](https://reactjs.org/docs/testing.html) [`Link2`](https://blog.bitsrc.io/complete-guide-to-unit-tests-with-react-af6ed372244b)

## Server

* Always add/update/modify the unit test for the components(jest or mocha). Ref: [`Link`](https://www.geeksforgeeks.org/unit-testing-of-node-js-application/)
* For New route create in server/src/routes/v1/ in the respective dashboard or app file and add the respective auth middleware
* Create new Route name only when we cannot change and reuse existing routes
* Never hard code strings place them in enums
* Write all the business in controller and DB logic in db/dal in the resective files
* Error handling should be every where with correct Ui related messages. put try catch in controller to avoid server crashes.
* prefer throwing an error rather than returning to avoid handling them. [`Link`](https://stackify.com/node-js-error-handling/)
* Add logs in all cathces and respective requests for effective debugging.
* Refer [`Link`](https://www.perfomatix.com/nodejs-coding-standards-and-best-practices/) for more best practices.
* Whenever any new apis or api modification happen do the same in sawagger apis docs. Ref: [`Link`](https://swagger.io/docs/specification/adding-examples/)
