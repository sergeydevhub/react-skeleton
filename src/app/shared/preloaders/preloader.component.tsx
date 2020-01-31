import React from "react";
import * as progress from './preloader-animation.component'

const preloaderVariants = {
  view: progress.ViewCircularProgress,
  layout: progress.LayoutCircularProgress,
  container: progress.ContainerCircularProgress,
  page: progress.PageCircularProgress
};

type Props = {
  Component: Promise<{ default: React.ComponentType }>
  variant: keyof typeof preloaderVariants;
}

export const Preloader: React.FC<Props> = (props: Props) => {
  const { Component, variant, ...rest } = props;
  const Progress = preloaderVariants[variant];

  const Loadable = React.memo(() => {
    const Lazy = React.lazy(() => {
      return Promise.resolve(Component)
    });

    return <Lazy />
  });

  return (
    <React.Suspense fallback={<Progress {...rest}/>}>
      <Loadable />
    </React.Suspense>
  )
};


