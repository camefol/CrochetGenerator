import { Diagram } from "../custom/crochetDiagramType";
import { Card, Button } from "react-native-paper";
import { View, Text, StyleSheet } from "react-native";

export const DiagramInfoCard : React.FC<{ diagram: Diagram, diagramId:string, children:any }> = ({ diagram, diagramId, children })/*({ diagram = {} }: { diagram: Diagram })*/ => {
    console.log('1DiagramInfoCard: diagram', diagram);
    const [expanded, setExpanded] = useState(false);
  
  
    return (
  
      <Card elevation={5} >
        
       
        <Text >
        <Card.Content>
          <Text style={{fontStyle:"italic", fontSize:18, fontWeight:"bold"}}>
          Name of Diagram: {diagram.Name}
          </Text>
        </Card.Content>
          <View style={{flex:1}}>
  
          </View>
          <Text style={{fontStyle:"italic", fontSize:18}}>Type: {diagram.Type}</Text>
  
          <Text style={{fontStyle:"italic", fontSize:18}}>Size of the Hook: {diagram.HookSize}</Text>
  
          <Text style={{fontStyle:"italic", fontSize:18}}>Stitch: {diagram.Stitch}</Text>
  
          <Text style={{fontStyle:"italic", fontSize:18}}>Columns: {diagram.Columns}</Text>
  
          <Text style={{fontStyle:"italic", fontSize:18}}>Rows: {diagram.Rows}</Text>
  
          <Text style={{fontStyle:"italic", fontSize:18}}>Height: {diagram.Height}</Text>
  
          <Text style={{fontStyle:"italic", fontSize:18}}>Width: {diagram.Width}</Text>
  
        </Text>
        <View style={{alignItems:"center", padding:8}}>
        <Button mode="contained">
        Delete Diagram
      </Button>
        </View>

        {children}
      
    </Card>
    
  
  );
  };