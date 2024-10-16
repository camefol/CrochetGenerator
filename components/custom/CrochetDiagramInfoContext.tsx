import React, {useState, createContext, useEffect, useRef, Children} from 'react';

export const DiagramInfoContext = createContext<{
    diagramField: {
      Name: string;
      Type: string;
      HookSize: string;
      Stitch: string;
      Columns: string;
        Rows: string;
        Height: string;
        Width: string;
        Description: string;
    };
    setDiagramField: React.Dispatch<
      React.SetStateAction<{
        Name: string;
        Type: string;
      HookSize: string;
      Stitch: string;
      Columns: string;
        Rows: string;
        Height: string;
        Width: string;
        Description: string;
      }>
    >;
  }>({
    diagramField: {
      Name: '',
      Type: '',
      HookSize: '',
      Stitch: '',
      Columns: '',
      Rows: '',
      Height: '',
      Width: '',
      Description: '',
    },
    setDiagramField: () => {},
  });


export const DiagramInfoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [diagramField, setDiagramField] = useState<{
      Name: string;
      Type: string;
      HookSize: string;
      Stitch: string;
      Columns: string;
        Rows: string;
        Height: string;
        Width: string;
        Description: string;
      }>({
        Name: '',
        Type: '',
      HookSize: '',
      Stitch: '',
      Columns: '',
      Rows: '',
      Height: '',
      Width: '',
      Description: '',
      });
    


return (
    <DiagramInfoContext.Provider value = {{
        diagramField, setDiagramField
    }}>
        {children}
    </DiagramInfoContext.Provider>
)
}