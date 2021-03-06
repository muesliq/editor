import React from 'react'
import input from '../../config/input.js'
import StringInput from './StringInput'
import NumberInput from './NumberInput'

import { margins } from '../../config/scales.js'

class ArrayInput extends React.Component {
  static propTypes = {
    value: React.PropTypes.array,
    type: React.PropTypes.string,
    length: React.PropTypes.number,
    default: React.PropTypes.array,
    style: React.PropTypes.object,
    onChange: React.PropTypes.func,
  }

  changeValue(idx, newValue) {
    console.log(idx, newValue)
    const values = this.values.slice(0)
    values[idx] = newValue
    this.props.onChange(values)
  }

  get values() {
    return this.props.value || this.props.default || []
  }

  render() {
    const commonStyle = {
      width: '49%',
      marginRight: '1%',
    }
    const inputs = this.values.map((v, i) => {
      if(this.props.type === 'number') {
        return <NumberInput
          key={i}
          value={v}
          style={commonStyle}
          onChange={this.changeValue.bind(this, i)}
        />
      } else {
        return <StringInput
          key={i}
          value={v}
          style={commonStyle}
          onChange={this.changeValue.bind(this, i)}
        />
      }
    })

    return <div style={{display: 'inline-block', width: '50%'}}>
      {inputs}
    </div>
  }
}

export default ArrayInput
