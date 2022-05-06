function getHeight(size: number, axis: 'horizontal' | 'vertical') {
  return axis === 'horizontal' ? size : 1;
}

function getWidth(size: number, axis: 'horizontal' | 'vertical') {
  return axis === 'vertical' ? size : 1;
}

export interface SpacerProps {
  size: number;
  axis?: 'horizontal' | 'vertical';
}

function Spacer({ size, axis = 'horizontal' }: SpacerProps) {
  return (
    <div
      style={{
        height: getHeight(size, axis),
        width: getWidth(size, axis),
        minHeight: getHeight(size, axis),
        minWidth: getWidth(size, axis),
      }}
    />
  );
}

export default Spacer;
