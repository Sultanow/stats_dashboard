# Status Dashboard Plotly App

A simple app to generate plotly graphs from excel data and python scripts with configuration capabilities.

# Requirements
- Python 3.2+
- Nodejs

# Usage

1. Clone respository
2. Open up 2 terminals
3. In the first terminal navigate to the **backend** folder.
4. Run `npm install`
5. After this run the command `npm start` and leave this terminal open in the background.
6. In the second terminal navigate to the **frontend** folder, if you don't have angular installed run the following command: `npm install -g @angular/cli`
7. Run `npm install`
8. Run `ng serve --open`

# Future Improvements:

- Currently excel-python bindings only have CRD functionality (no update), ideally there should also be an update option available.
- Angular application should be exported to a production environment to avoid having to install locally.