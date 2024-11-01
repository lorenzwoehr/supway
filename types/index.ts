export interface FontMetricsType {
  ascent: number;
  baseline: number;
  bottom: number;
  descent: number;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
  tittle: number;
  top: number;
  xHeight: number;
}

export interface SizeData {
  parentSize: number;
  fluidLarger: number;
  fluidDefault: number;
  fluidSmaller: number;
  staticDefault: number;
}
