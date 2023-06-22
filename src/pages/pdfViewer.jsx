import React, { Component, useContext, useEffect } from "react";
import { StoreContext } from "../store/store-context";
import {
    Image,
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    PDFViewer,
    Link,

} from "@react-pdf/renderer";
import uuid from "react-uuid"
import { useNavigate } from "react-router-dom";

const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        color: "black",
        marginTop: "70",
    },
    rowViewHeader: {
        width: "95%",
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        border: "1px solid grey",
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: "center",
        backgroundColor: "gray",
        fontWeight: "bold",
        fontSize: "18px",
    },
    rowView: {
        width: "95%",
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        border: "1px solid grey",
        paddingTop: 8,
        paddingBottom: 8,
        textAlign: "center",
    },
    image: {
        position: "absolute",
        left: "33%",
        top: "30%",
        transform: "translate(-50%,-50%)",
        width: 300,
        height: 300,
        opacity: 0.2,
        zIndex: -100,
        margin: "auto",
    },
    viewer: {
        width: window.innerWidth, //the pdf viewer will take up all of the width and height
        height: window.innerHeight,
    },
    link: {
        color: "black",
        textDecoration: "none",
        paddingRight: "10px",
        fontSize: "10px",
    },
    footer: {
        position: "absolute",
        bottom: "10%",
        left: "40%",
        textAlign: "center",
        transform: "translate(-50%,0)",
        display: "flex",
        flexDirection: "row",
    },
});





const PdfViewer = () => {
    const [state, dispatch] = useContext(StoreContext);
    const navigate = useNavigate()

    useEffect(() => {

        if (state.pdfDoc.title === '') {
            navigate(-1)
        }

    }, [])

    const total = state.pdfDoc.generalData.selectedItem.reduce((acc, curr) => acc + (+curr.amount), 0).toFixed('2')

    const gst=state.pdfDoc.generalData.selectedItem.reduce((acc,curr)=> acc+((+curr.amount)*((+curr.gst)/100)),0).toFixed('2')

    const payableAmount=(+total+(+gst)).toFixed('2')



    return (
        <>
            <PDFViewer style={styles.viewer}>
                <Document styles={styles.page}>
                    <Page size="A4" style={styles.page}>
                        <Image style={styles.image} src="/logo.png" />
                        <Text
                            style={{
                                position: "relative",
                                textAlign: "center",
                                fontSize: "30px",
                                fontWeight: "bold",
                                marginBottom: 20,
                                color: "#2a275c",
                            }}
                        >
                            {state.pdfDoc.title}
                        </Text>
                        <View
                            style={{
                                width: "95%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                paddingBottom: "20",
                                fontSize: "15",
                            }}
                        >
                            <View
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                }}
                            >
                                <Text>{`Name: ${state.pdfDoc.generalData.name}`}</Text>
                                <Text>{`Phone: ${state.pdfDoc.generalData.phone}`}</Text>
                            </View>
                            <Text>{`Address: ${state.pdfDoc.generalData.address}`}</Text>
                            <Text>{`Invoice Number: ${state.pdfDoc.generalData.invoiceNumber}`}</Text>
                            <Text>{`Invoice Date: ${state.pdfDoc.generalData.invoiceDate}`}</Text>
                        </View>
                        <View style={styles.rowViewHeader}>
                            {state.pdfDoc.column.map((c, i) => (
                                <Text
                                    key={uuid() + i}
                                    style={{
                                        position: "relative",
                                        width: `${100 / state.pdfDoc.column.length}%`,
                                    }}
                                >
                                    {c}
                                </Text>
                            ))}
                        </View>
                        {state.pdfDoc.data.map((rowData) => (
                            <>
                                <View style={styles.rowView}>
                                    {state.pdfDoc.column.map((c) => (
                                        <Text
                                            key={uuid()}
                                            style={{
                                                width: `${100 / state.pdfDoc.column.length}%`,
                                                position: "relative",
                                                fontSize: "12px",
                                            }}
                                        >
                                            {rowData[c]}
                                        </Text>
                                    ))}
                                </View>
                            </>
                        ))}
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "95%",
                                flexDirection: "row",
                                alignSelf: "center",
                                border: "1px solid grey",
                                paddingTop: 8,
                                paddingBottom: 8,
                                backgroundColor: "gray",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "13",
                                    position: "relative",
                                    right: "-100%",
                                }}
                            >
                                Total
                            </Text>
                            <Text
                                style={{ fontSize: "13", position: "relative", left: "-100%" }}
                            >
                                {total} 
                            </Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "95%",
                                flexDirection: "row",
                                alignSelf: "center",
                                border: "1px solid grey",
                                paddingTop: 8,
                                paddingBottom: 8,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "13",
                                    position: "relative",
                                    right: "-100%",
                                }}
                            >
                                GST
                            </Text>
                            <Text
                                style={{ fontSize: "13", position: "relative", left: "-100%" }}
                            >
                                {gst} 
                            </Text>
                        </View>
                        <View
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "95%",
                                flexDirection: "row",
                                alignSelf: "center",
                                border: "1px solid grey",
                                paddingTop: 8,
                                paddingBottom: 8,
                                backgroundColor: "gray",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: "13",
                                    position: "relative",
                                    right: "-100%",
                                }}
                            >
                                Payable Amount
                            </Text>
                            <Text
                                style={{ fontSize: "13", position: "relative", left: "-100%" }}
                            >
                                {payableAmount} 
                            </Text>
                        </View>
                        <View style={styles.footer}>
                            <Link style={styles.link} src="itaxeasy.com">
                                www.itaxeasy.com{"   |   "}
                            </Link>
                            <Text style={styles.link}>
                                Email : info@itaxeasy.com
                            </Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </>
    );
};

export default PdfViewer;
