import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { selectItem } from '../actions';

/**
 * The value that is selected in here is made available in the store...
 * if You're going to use this component, the following props are
 * required:
 *
 * @name: the name of the select
 * @nameKey: The key to access the item that should be displayed.
 * @valueKey: A key to reference something unique like an ID.
 * @items: objects that contain at least an attribute to be displayed.
 *
 * The value once selected is put into the store, and if you've mapped the
 * store to your component's props, it can be accessed by doing
 * this.props.select.items[@name]
 * */
class BaseSelect extends Component {
  handleChange = event => {
    this.props.dispatch(selectItem(this.props.name, event.target.value));
  };

  render() {
    let name = this.props.name;
    let id = name + '-select';
    let nameKey = this.props.nameKey;
    let valueKey = this.props.valueKey;
    let items = this.props.items;
    let selected = this.props.select.items[this.props.name];
    let fallback = {};
    fallback[nameKey] = '';
    let value = selected ? selected[nameKey] : fallback[nameKey];

    return (
      <FormControl>
        <InputLabel htmlFor={id}>{name}</InputLabel>
        <Select
          value={value}
          onChange={this.handleChange}
          renderValue={value => value}
          inputProps={{
            name: name,
            id: id
          }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {items.map(item => (
            <MenuItem key={item[valueKey]} value={item}>
              {item[nameKey]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

const mapStateToProps = state => ({
  select: state.select
});

export default connect(mapStateToProps)(BaseSelect);
