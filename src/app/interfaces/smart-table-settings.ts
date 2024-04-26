export default interface SmartTableSettings {
  add: {
    addButtonContent: string;
    createButtonContent: string;
    cancelButtonContent: string;
  };
  edit: {
    editButtonContent: string;
    saveButtonContent: string;
    cancelButtonContent: string;
  };
  delete: {
    deleteButtonContent: string;
    confirmDelete: true;
  };
  columns: {
    key?: {
      title: string;
      type: string;
    };
  };
}

export interface Column {
  [key: string]: {
    title: string;
    type: string;
  };
}
