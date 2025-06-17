import React from 'react';
   import Navigation from './components/Navigation';
   import FormPage from './components/FormPage';

   const App: React.FC = () => {
     const [pages, setPages] = React.useState([
       { id: '1', title: 'Info', active: true },
       { id: '2', title: 'Details', active: false },
       { id: '3', title: 'Other', active: false },
       { id: '4', title: 'Ending', active: false },
     ]);
     const [showMenu, setShowMenu] = React.useState<string | null>(null);

     const addPage = (index: number) => {
       const newPages = [...pages];
       newPages.splice(index + 1, 0, { id: `${Date.now()}`, title: 'New Page', active: false });
       setPages(newPages);
     };

     const setActivePage = (id: string) => {
       setPages(pages.map(page => ({ ...page, active: page.id === id })));
     };

     return (
       <div className="app-container">
         <Navigation
           pages={pages}
           setPages={setPages}
           addPage={addPage}
           setActivePage={setActivePage}
           showMenu={showMenu}
           setShowMenu={setShowMenu}
         />
         <FormPage page={pages.find(p => p.active)} />
       </div>
     );
   };

   export default App;