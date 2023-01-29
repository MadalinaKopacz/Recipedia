import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import React from "react";

interface ContentInfo {
  title: string;
  list: string[];
  color: string;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  "&:not(:last-child)": {},
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "#F9F3ED",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(() => ({
  backgroundColor: "#F9F3ED",
}));

export default function LabelList({ title, list, color }: ContentInfo) {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <Accordion
      sx={{
        marginTop: 8,
      }}
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
    >
      <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
        <Typography sx={{ fontFamily: "Playfair", fontWeight: "bold" }}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ display: "flex", flexWrap: "wrap" }}>
        {list.map((element) => (
          <Typography
            sx={{
              fontFamily: "Playfair",
              backgroundColor: color,
              borderRadius: 10,
              paddingY: 1,
              paddingX: 2,
              margin: 1,
            }}
          >
            {element}
          </Typography>
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
