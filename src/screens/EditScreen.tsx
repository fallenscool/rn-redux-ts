import React from "react";
import { View, StyleSheet, Button, SafeAreaView } from "react-native";
import { User, editUser } from "../actions";
import { StoreState } from "../reducers";
import { connect } from "react-redux";
import { NavigationInjectedProps } from "react-navigation";
import { Form } from "../components/Form";

interface EditScreenProps extends NavigationInjectedProps {
  users: User[];
  editUser: Function;
}

interface EditScreenState {
  id: number;
  nameInput: string;
  ageInput: string;
  error: string;
}

class _EditScreen extends React.Component<EditScreenProps, EditScreenState> {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.navigation.getParam("id"),
      nameInput: this.props.navigation.getParam("name"),
      ageInput: this.props.navigation.getParam("age"),
      error: ""
    };
  }

  validate = () => {
    if (this.state.nameInput.length > 0 && this.state.ageInput.length > 0) {
      this.props.editUser(
        this.props.users,
        this.state.id,
        this.state.nameInput,
        this.state.ageInput
      );
      this.setState({
        nameInput: "",
        ageInput: "",
        error: ""
      });
      this.props.navigation.navigate("Index");
    } else {
      this.setState({
        error: "Please fill all the fields!"
      });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Form
          nameInput={this.state.nameInput}
          ageInput={this.state.ageInput}
          setAgeInput={(text: string) => this.setState({ ageInput: text })}
          setNameInput={(text: string) => this.setState({ nameInput: text })}
          error={this.state.error}
        />
        <View style={styles.button}>
          <Button title="Edit user" onPress={this.validate} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center"
  },
  input: {
    height: 50,
    width: "80%",
    alignSelf: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "grey",
    marginVertical: 10,
    paddingLeft: 10
  },
  label: {
    alignSelf: "center",
    marginTop: 10
  },
  button: {
    marginVertical: 10,
    backgroundColor: "lightblue",
    width: "100%"
  },
  error: {
    color: "red"
  }
});

const mapStateToProps = (state: StoreState): { users: User[] } => {
  return { users: state.users };
};

export const EditScreen = connect(
  mapStateToProps,
  { editUser }
)(_EditScreen);
