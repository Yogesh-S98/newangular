
  
   export const tableConfig = {
    columns: [
      // {
      //   field: 'index',
      //   header: 'Index',
      //   pipe: 'null'
      // },
      {
        field: 'name',
        header: 'Name',
        pipe: 'null',
      },
      {
        field: 'category',
        header: 'Category',
        pipe: 'null',
    },
      {
        header: 'Actions',
        type: 'actions',
        actions: [
          {
            type: 'edit',
            text: 'Edit',
            icon: 'pi pi-pencil',
          },
          {
            type: 'delete',
            text: 'Delete',
            icon: 'pi pi-trash',
          },
        ],
      },
    ],
  };
  

    
      
  
 
  