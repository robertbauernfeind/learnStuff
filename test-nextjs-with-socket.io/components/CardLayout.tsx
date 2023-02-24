import { ReactNode } from "react";
import Card from "react-bootstrap/Card";

type CardLayoutProps = {
    children: ReactNode
    preview?: boolean
    header?: string
    title?: string
    style?: React.CSSProperties
}

export default function CardLayout({ children, preview, header, title, style }: CardLayoutProps) {
    return (
        <Card style={{
            margin: 10,
            border: "1px solid lightgray",
            borderRadius: 5,
            boxShadow: "0px 0px 10px 0px lightgray",
            maxWidth: "95vw",
            maxHeight: "80vh",
            ...style
        }}>
            <Card.Header style={{
                padding: "10px 0px 5px 10px",
                fontSize: "1.5rem",
                fontWeight: "bold"
            }}>
                {header ? header : ""}
            </Card.Header>
            <Card.Body>
                <Card.Title style={{
                    padding: "0px 0px 0px 10px"
                }}>
                    {title ? title : ""}
                </Card.Title>
                <main>{children}</main>
            </Card.Body>
        </Card>
    )
}