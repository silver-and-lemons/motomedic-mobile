import { Button as UIButton, type ButtonProps as UIButtonProps } from '../ui/button';

type ButtonProps = Omit<UIButtonProps, 'title'> & {
  children: string;
};

export function Button({ children, ...props }: ButtonProps) {
  return <UIButton title={children} {...props} />;
}
