import React, { HTMLAttributes } from 'react'
import './index.scss'

interface IProps extends HTMLAttributes<Element> {
  // 值为0~100
  value: number
  showValue?: boolean
}

export const ProgressBar: React.FC<IProps> = ({
  value,
  className,
  showValue,
  ...otherProps
}) => {
  const rate = value > 100 ? 100 : value < 0 ? 0 : value
  return (
    <div className={`progress-bar-wrap ${className}`} {...otherProps}>
      {showValue && <div className="progress-value">{value}</div>}
      <div className="progress-bar">
        <div
          className="track"
          style={{
            height: `calc(${rate}%)`,
          }}
        ></div>
      </div>
    </div>
  )
}
