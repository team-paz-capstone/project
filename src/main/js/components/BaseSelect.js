import React, {Component} from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

class BaseSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ""}
  }

  handleChange = (event) => {
    console.debug("Selected: " + JSON.stringify(event.target));
    this.setState({value: event.target.value});
  };

  render() {
    let name = this.props.name;
    let id = name + "-select";
    let nameKey = this.props.nameKey;
    let valueKey = this.props.valueKey;
    let items = this.props.items;
    let value = this.state.value;
    if (this.state.value){
      items.forEach(item => {
        if (item[value] === value){
          value = item[nameKey]
        }
      })
    }

    return (
        <FormControl>
          <InputLabel htmlFor={id}>{name}</InputLabel>
          <Select
              value={value}
              onChange={this.handleChange}
              inputProps={{
                name: name,
                id: id,
              }}
          >
            {items.map(item => (
                <MenuItem
                    key={item[valueKey]}
                    value={item[valueKey]}>
                  {item[nameKey]}
                </MenuItem>
            ))}
          </Select>
        </FormControl>
    );
  }
}

export default BaseSelect;