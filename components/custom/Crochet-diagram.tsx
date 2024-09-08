import { Text, type TextProps, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { BetterText } from '../topology/BetterText';
export interface Diagram {
    Name?: string;
    Type?: string;
    HookSize?: number;
    Stitch?: string;
    Columns: number;
    Rows: number;
    Height: number;
    Width: number;
    id: string;
    Description: string;
    }



const CrochetDiagram = () => {
    const crochetDiagram: Diagram ={
        Name: " Basic Crochet Diagram",
        Type: "Square",
        HookSize: 5,
        Stitch: 'Single Crochet',
        Columns: 10,
        Rows: 15,
        Height: 20,
        Width: 15,
        id: 'diagram123',
        Description: 'This is a basic crochet pattern with single crochet stitches.',
    };
    return (
        <Card>
            <Text>Name: {crochetDiagram.Name}</Text>
            <Text>Type: {crochetDiagram.Type}</Text>
            <Text>Hook Size: {crochetDiagram.HookSize}</Text>
            <Text>Stitch: {crochetDiagram.Stitch}</Text>
            <Text>Columns: {crochetDiagram.Columns}</Text>
            <Text>Rows: {crochetDiagram.Rows}</Text>
            <Text>Height: {crochetDiagram.Height} cm</Text>
            <Text>Width: {crochetDiagram.Width} cm</Text>
            <Text>Description: {crochetDiagram.Description}</Text>
        </Card>
    )
}

export default CrochetDiagram;