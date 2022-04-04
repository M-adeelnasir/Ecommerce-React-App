import React from 'react'
import { Document, Page, Text, StyleSheet } from '@react-pdf/renderer';
import { Table, TableBody, TableCell, TableHeader, DataTableCell } from '@david.kucsai/react-pdf-table'

const Invoice = ({ order }) => {
    return (
        <Document>
            <Page style={styles.body}>
                <Text style={styles.header} fixed>~{new Date().toLocaleString()} ~</Text>
                <Text style={styles.title}>Order Invoice</Text>
                <Text style={styles.subtitle}>Order summary</Text>

                <Table>
                    <TableHeader>
                        <TableCell>Title</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Brand</TableCell>
                        <TableCell>Color</TableCell>
                    </TableHeader>
                </Table>

                <Table data={order.products}>
                    <TableBody>
                        <DataTableCell getContent={(x) => x.product.title} />
                        <DataTableCell getContent={(x) => x.product.price} />
                        <DataTableCell getContent={(x) => x.product.quantity} />
                        <DataTableCell getContent={(x) => x.product.brand} />
                        <DataTableCell getContent={(x) => x.product.color} />
                    </TableBody>
                </Table>

                <Text style={styles.text}>
                    <Text>
                        Date: {'             '}  {new Date(order.paymentIntent.created * 1000).toLocaleString()}
                    </Text>
                    {'\n'}
                    <Text>
                        order ID: {"       "}  {order.paymentIntent.id}
                    </Text>
                    {'\n'}
                    <Text>
                        Order status: {''}  {order.orderStatus}
                    </Text>
                    {'\n'}
                    <Text>
                        Total paid:{'    '}   {`$${((order.paymentIntent.amount) / 100).toFixed(2)}`}
                    </Text>
                </Text>

                <Text style={styles.footer}>~Thanks for the Purchase with us~</Text>
            </Page>
        </Document>
    )
}


const styles = StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
    },
    author: {
        fontSize: 12,
        textAlign: "center",
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 18,
        margin: 12,
    },
    text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
    },
    image: {
        marginVertical: 15,
        marginHorizontal: 100,
    },
    header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    footer: {
        padding: "100px",
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
    },
    pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
    },
});

export default Invoice