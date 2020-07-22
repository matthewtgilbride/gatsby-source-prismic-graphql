import React, { ComponentType, FC, ReactElement, ReactNode } from 'react';
import { WrapPage } from './WrapPage';

export const withPreview = <T extends object = any>(
  render: FC<T>,
  query: any,
  fragments: any = []
): FC<T> | null => {
  if (typeof window === 'undefined') {
    return render;
  }

  if (!render) {
    return null;
  }

  const RenderComponent = ({ data }: any) => render(data);
  const rootQuery = `${query.source}${fragments
    .map((fragment: any) => (fragment && fragment.source ? fragment.source : ''))
    .join(' ')}`;

  return (data: any) => (
    <WrapPage
      data={data}
      pageContext={{ rootQuery }}
      options={(window as any).prismicGatsbyOptions || {}}
    >
      <RenderComponent />
    </WrapPage>
  );
};

export type WithPreviewProps<T> = {
  data: T;
  query: any;
  fragments: any[];
  Component: ComponentType<T>;
};

export const WithPreview = <T extends object = any>({
  data,
  query,
  fragments,
  Component,
}: WithPreviewProps<T>): ReactElement | null => {
  if (typeof window === 'undefined') {
    return <Component {...{ ...data }} />;
  }

  if (!Component) {
    return null;
  }

  const rootQuery = `${query.source}${fragments
    .map((fragment: any) => (fragment && fragment.source ? fragment.source : ''))
    .join(' ')}`;

  return (
    <WrapPage
      data={data}
      pageContext={{ rootQuery }}
      options={(window as any).prismicGatsbyOptions || {}}
    >
      <Component {...{ ...data }} />
    </WrapPage>
  );
};
