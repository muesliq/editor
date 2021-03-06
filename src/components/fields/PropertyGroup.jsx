import React from 'react'
import GlSpec from 'mapbox-gl-style-spec/reference/latest.js'

import ZoomSpecField from './ZoomSpecField'
import colors from '../../config/colors'
import { margins } from '../../config/scales'

/** Extract field spec by {@fieldName} from the {@layerType} in the
 * style specification from either the paint or layout group */
function getFieldSpec(layerType, fieldName) {
  const groupName = getGroupName(layerType, fieldName)
  const group = GlSpec[groupName + '_' + layerType]
  return group[fieldName]
}

function getGroupName(layerType, fieldName) {
  const paint  = GlSpec['paint_' + layerType] || {}
  if (fieldName in paint) {
    return 'paint'
  } else {
    return 'layout'
  }
}

export default class PropertyGroup extends React.Component {
  static propTypes = {
    layer: React.PropTypes.object.isRequired,
    groupFields: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired,
  }

  onPropertyChange(property, newValue) {
    const group = getGroupName(this.props.layer.type, property)
    this.props.onChange(group , property, newValue)
  }

  render() {
    const fields = this.props.groupFields.map(fieldName => {
      const fieldSpec = getFieldSpec(this.props.layer.type, fieldName)

      const paint = this.props.layer.paint || {}
      const layout = this.props.layer.layout || {}
      const fieldValue = fieldName in paint ? paint[fieldName] : layout[fieldName]

      return <ZoomSpecField
        onChange={this.onPropertyChange.bind(this)}
        key={fieldName}
        fieldName={fieldName}
        value={fieldValue}
        fieldSpec={fieldSpec}
      />
    })

    return <div>
      {fields}
    </div>
  }
}
