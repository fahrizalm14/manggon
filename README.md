
# Manggon Js

Simple Backend Framework
## Installation

```bash
  npm install manggon
```
    
## Usage/Examples

```javascript
import { App, Handler } from 'manggon';

const init = async () => {
  const server = new App({
    port: 2000,
    handler: [
      new Handler('', {
        childPath: '',
        method: 'get',
        function: async (_req, res) =>
          res.status(200).json({ message: 'success' })
      })
    ]
  });

  await server.run();
};

init();
```

