import React, {useState, createContext, useEffect, useRef, Children} from 'react';

export const DiagramInfoContext = createContext<{
    diagramField: {
      Name: string;
      Type: string;
      HookSize: number;
      Stitch: string;
      Columns: string;
        Rows: string;
        Height: number;
        Width: number;
        Description: string;
    };
    setDiagramField: React.Dispatch<
      React.SetStateAction<{
        Name: string;
        Type: string;
        HookSize: number;
        Stitch: string;
        Columns: string;
          Rows: string;
          Height: number;
          Width: number;
          Description: string;
      }>
    >;
  }>({
    diagramField: {
      Name: '',
      Type: '',
      HookSize: 0,
      Stitch: '',
      Columns: '',
      Rows: '',
      Height: 0,
      Width: 0,
      Description: '',
    },
    setDiagramField: () => {},
  });


export const DiagramInfoContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [diagramField, setDiagramField] = useState<{
      Name: string;
      Type: string;
      HookSize: number;
      Stitch: string;
      Columns: string;
        Rows: string;
        Height: number;
        Width: number;
        Description: string;
      }>({
        Name: '',
        Type: '',
      HookSize: 0,
      Stitch: '',
      Columns: '',
      Rows: '',
      Height: 0,
      Width: 0,
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