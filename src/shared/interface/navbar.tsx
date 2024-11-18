import { SvgIconComponent } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Component, ReactElement } from "react";

export interface NavData {
  title: string;
  route: string;
  itemIcon: ReactElement;
}
