// emails/GenericEmail.jsx

import React from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Text,
  Heading,
} from "@react-email/components";

export function GenericEmail({subject, text }) {
  return (
    <Html>
      <Head />
      <Preview>{subject}</Preview>
      <Body
        style={{
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f6f6f6",
          padding: "20px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #eee",
          }}
        >
          <Heading style={{ color: "#002E3C" }}>{subject}</Heading>
          <Text
            style={{ fontSize: "16px", lineHeight: "24px" }}
            dangerouslySetInnerHTML={{ __html: text }}
          />
          <Text style={{ fontSize: "12px", color: "#999", marginTop: "20px" }}>
            — Bilsa Bank
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
