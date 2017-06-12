import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import * as Colors from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import * as actions from '../services/nodes/nodes-actions';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import ForcedGraph from './forced-graph';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: Colors.darkBlack,
    primary1Color: "#F3294D",
    primary2Color: "#F3294D",
    accent1Color: "#010144",
    pickerHeaderColor: Colors.darkBlack,
    alternateTextColor: Colors.white
  },
  body: {
  	padding: '15px'
  }
});

const items = [
  <MenuItem key={1} value="Ultipro" primaryText="Ultipro" />,
  <MenuItem key={2} value="IIQ" primaryText="IIQ" />,
  <MenuItem key={3} value="Salesforce" primaryText="Salesforce" />,
  <MenuItem key={4} value="SBP" primaryText="SBP" />,
  <MenuItem key={5} value="Cloud Coach" primaryText="Cloud Coach" />,
  <MenuItem key={6} value="RemedyForce" primaryText="RemedyForce" />,
  <MenuItem key={7} value="Oracle iExpense" primaryText="Oracle iExpense" />,
  <MenuItem key={8} value="Oracle ERP" primaryText="Oracle ERP" />,
];

class Nodes extends Component {
	constructor(props) {
		super(props);
		this.save = this.save.bind(this);
    this.getNodes = this.getNodes.bind(this);
    this.props.actions.getAllNodes();
	}
  state = {
    srcValue: 'Ultipro',
    tgtValue: 'Oracle ERP',
    linkValue: 'SENDS'
  };

  handleSourceChange = (event, index, value) => {console.log('source changed'); this.setState({srcValue: value})};
  handleTargetChange = (event, index, value) => this.setState({tgtValue: value});
  handleLinkChange = (event, index, value) => this.setState({linkValue: value});

  save() {
  	this.props.actions.saveNewNode(this.state.srcValue, this.state.linkValue, this.state.tgtValue);
  }

  getNodes() {
    this.props.actions.getAllNodes();
  }

	render() {
		return (
      <MuiThemeProvider muiTheme={muiTheme} >
				<div style={muiTheme.body}>
	        <br />
	        <SelectField
	          value={this.state.srcValue}
	          onChange={this.handleSourceChange}
	          floatingLabelText="Source Node"
	        >
	          {items}
	        </SelectField>
	        <br />
	        <TextField
	          id="link-text"
	          value={this.state.linkValue}
	          onChange={this.handleLinkChange}
	        />
	        <br />
	        <SelectField
	          value={this.state.tgtValue}
	          onChange={this.handleTargetChange}
	          floatingLabelText="Target Node"
	        >
	          {items}
	        </SelectField>
	        <br /><br />
					<RaisedButton label="Save" primary={true} onTouchTap={this.save}/>
          <RaisedButton label="Get all nodes" primary={true} onTouchTap={this.getNodes}/>
          <hr />
          <ForcedGraph data={this.props.nodes_list} />
				</div>
      </MuiThemeProvider>
		)
	}
}

// Redux hook functions to connect and fetch data from the store
export const mapStateToProps = ( state ) => {
  return (
    { 
    	nodes_list: state.nodes.nodes_list
    }
  )
}

export const mapDispatchToProps = (dispatch) => {
	console.log(dispatch);
	return ({
  actions: bindActionCreators(actions, dispatch)
})};

export default connect (mapStateToProps, mapDispatchToProps) (Nodes);
