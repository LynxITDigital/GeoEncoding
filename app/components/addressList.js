import React, {
  StyleSheet,
  Component,
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ListView
} from 'react-native';

const styles = StyleSheet.create({
  inputContainer: {
    marginTop:40,
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'stretch',
    backgroundColor: '#F5FCFF',
  },
  listContainer: {
    marginTop:40,
    flexDirection:'row',
    alignItems: 'center',
    alignSelf:'stretch',
    backgroundColor: '#F5FCFF',
  },
  searchInput: {
    height: 36,
    width:300,
    padding: 4,
    marginRight: 5,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor: '#48BBEC'
  },
  button:{
    height: 36,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    backgroundColor:'#48BBEC',
    alignSelf:'stretch',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:18
  },
  row:{
    height: 40,
    borderWidth:1,
    borderColor:'#fff',

  }
});

export default class AddressList extends Component {

  constructor(props) {
    super(props);
  }

  onSearchTextChanged(event){
    this.props.changeSearchText(event.nativeEvent.text);
  }

  onFindPressed(){
    this.props.fetchAddresses(this.props.searchString);
  }


  renderRow(rowData){
    var address = rowData.formatted_address;
    return(
      <View style={styles.row}>
      <Text>{address}</Text>
      </View>
    )
  }

  render() {
    const { searchString,addresses,fetchAddresses } = this.props;
    
    return (
      <View>
        <View style={styles.inputContainer}>
          <TextInput
          style={styles.searchInput}
          value= {searchString}
          onChange={this.onSearchTextChanged.bind(this)}
          placeholder="Search location"/>

          <TouchableHighlight
          style={styles.button}
          onPress={this.onFindPressed.bind(this)}>
            <Text style={styles.buttonText}>Find</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.listContainer}>
          <ListView
          dataSource={addresses}
          renderRow={this.renderRow.bind(this)} />
        </View>
      </View>
    );
  }


}
