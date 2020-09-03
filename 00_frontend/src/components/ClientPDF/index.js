import React, {useRef} from 'react';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import hugLogo from '../../hug_logo.png'
// Create styles
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF'
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
});

// Create Document Component
export default props => {

    /*
    const svg = function (){
        return (<QRCode
                level="Q"
                style={{width: 256, marginBottom: 50 }}
                value={'hello world'}
            />);
      };

    const serializer = new XMLSerializer();
    console.log(svg.toDataUrl())
    const svgStr = serializer.serializeToString(svg);
    const img_src = 'data:image/svg+xml;base64,' + window.btoa(svgStr);
*/
console.log(props,hugLogo)
    return (
        <>

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                    {props.qr !== null && props.qr !== undefined && <Image source={{uri:props.qr}} style={{width:140,height:140}}/>}
                    <Image allowDangerousPaths={true} source={{ uri : 'hug_logo.png', method:'GET'}}  style={{width:140,height:140}}/>

                </View>
            </Page>
        </Document>
        </>
    )
}