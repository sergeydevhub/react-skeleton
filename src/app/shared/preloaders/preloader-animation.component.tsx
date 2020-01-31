import React from 'react';
import CircularProgress, { CircularProgressProps } from "@material-ui/core/CircularProgress";

const PageCircularProgress: React.FC<CircularProgressProps> = (props: CircularProgressProps) => (
  <CircularProgress size={70} color="primary" thickness={2} { ...props } />
);

const LayoutCircularProgress: React.FC<CircularProgressProps> = (props: CircularProgressProps) => (
  <CircularProgress size={60} color="primary" thickness={2} { ...props } />
);

const ContainerCircularProgress: React.FC<CircularProgressProps> = (props: CircularProgressProps) => (
  <CircularProgress size={40} color="primary" thickness={3} { ...props } />
);

const ViewCircularProgress: React.FC<CircularProgressProps> = (props: CircularProgressProps) => (
  <CircularProgress size={50} color="primary" thickness={2.6} { ...props } />
);

export {
  PageCircularProgress,
  LayoutCircularProgress,
  ContainerCircularProgress,
  ViewCircularProgress
}
