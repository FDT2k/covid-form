import React, { useRef } from 'react';
import { Page, Image, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import hugLogo from '../../hug_logo.png'
// Create styles
const styles = StyleSheet.create({
    page: {
      
    },
    section: {
        flexDirection: 'column',
        justifyContent:'center',
        alignContent:'center',
        alignSelf:'center',
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
    console.log(props, hugLogo)
    return (
        <>
            <Document>
                <Page debug={true} size="A4" style={styles.page}>
                   
               {/*     <View debug={true} style={styles.section}>
                        <Image debug={true} allowDangerousPaths={true} source={{ uri: 'hug_logo.png', method: 'GET' }} style={{ width: 140, height: 140 }} />
    </View>*/}
                        <View debug={true} style={{textAlign: 'center'}}>
                              <Text  debug={true}>Enregistrement Covid</Text>
                        </View>

                        <View debug={true} style={styles.section}>
                    
                        {props.qr !== null && props.qr !== undefined && <Image source={{ uri: props.qr }} style={{ width: 140, height: 140 }} />}

                    </View>
                </Page>
            </Document>
        </>
    )
}