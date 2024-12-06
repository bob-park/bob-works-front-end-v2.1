import cx from 'classnames';

interface ButtonProps {
  type?: 'button' | 'submit';
  color?: Color;
  size: Size;
}

function getBtnColor(color: Color) {
  switch (color) {
    case 'primary':
      return '';
    case 'error':
      return 'bg-red-500 hover:bg-red-600 focus:bg-red-600';
    case 'success':
      return '';
    case 'warning':
      return '';

    default:
      return '';
  }
}

export default function Button({ type = 'button', color = 'primary' }: ButtonProps) {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex items-center gap-x-2 rounded-lg border border-transparent px-4 py-3 text-sm font-medium text-white focus:outline-none disabled:pointer-events-none disabled:opacity-50',
        // color
        getBtnColor(color),
      )}
    ></button>
  );
}
