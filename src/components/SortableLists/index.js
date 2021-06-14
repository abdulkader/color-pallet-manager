import cx from 'classname';
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';

export const SortableContainer = sortableContainer(
  ({ children, className = '' }) => {
    return <div className={cx('sortableContainer', className)}>{children}</div>;
  }
);

export const SortableItem = sortableElement(({ children, className = '' }) => (
  <div className={cx('sortableElement', className)}>{children}</div>
));

export const DragHandle = sortableHandle(({ className }) => (
  <div
    className={cx(
      'draghandle',
      'w-4 h-full flex items-center align-middle cursor-move mr-2 text-theme-primary-500',
      className
    )}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
    </svg>
  </div>
));
