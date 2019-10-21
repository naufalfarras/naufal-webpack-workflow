// Import Styling
import '../styles/main.scss';

// Import Vendor
import './vendor';

import mainContent from './importer';

if (module.hot) {
   module.hot.accept('./importer.js', function() {
      mainContent();
   });
}
