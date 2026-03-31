import { style } from "@vanilla-extract/css";

export const shell = style({
  minHeight: "100vh",
  padding: "48px",
  background: "linear-gradient(180deg, #f4f7fb 0%, #ffffff 100%)",
  color: "#17202a",
  fontFamily: '"Pretendard", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif'
});

export const panel = style({
  maxWidth: "960px",
  margin: "0 auto",
  padding: "32px",
  borderRadius: "24px",
  backgroundColor: "#ffffff",
  boxShadow: "0 20px 60px rgba(23, 32, 42, 0.08)"
});

export const eyebrow = style({
  marginBottom: "12px",
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "#55708d"
});

export const heading = style({
  margin: 0,
  fontSize: "40px",
  lineHeight: 1.1,
  letterSpacing: "-0.04em"
});

export const body = style({
  maxWidth: "640px",
  marginTop: "16px",
  marginBottom: 0,
  fontSize: "17px",
  lineHeight: 1.7,
  color: "#445566"
});

export const metaGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginTop: "32px"
});

export const metaItem = style({
  margin: 0,
  padding: "18px 20px",
  borderRadius: "18px",
  backgroundColor: "#f7f9fc",
  border: "1px solid #e3eaf2"
});

export const metaLabel = style({
  margin: 0,
  fontSize: "12px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#6f8194"
});

export const metaValue = style({
  margin: "10px 0 0",
  fontSize: "16px",
  fontWeight: 600,
  color: "#17202a"
});
