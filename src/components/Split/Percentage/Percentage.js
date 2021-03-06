import React, { Component } from 'react';
import {
    StyleSheet, Alert, TextInput,
} from 'react-native';
import {
    Container, Input, Content, Footer, Picker, List,
    FooterTab, Button, Text, Icon, Form, Item, ListItem,
    Right, Body, Textarea, Left,
} from 'native-base';



export default class Percentage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected2: undefined,
            description: "",
            amount: "",
            notes: "",
            selectedContacts: this.props.navigation.state.params.selectedContacts,
        };
    }

    onValueChange2(value: string) {
        this.setState({
            selected2: value
        });
    }

    render() {
        const SelectedList = (props) => {

            const list = ({ allContacts }) => {
                if (allContacts) {
                    return allContacts.map((item) => {
                        return (
                            <ListItem key={item.id}>
                                <Body>
                                    <Text>{`${item.first_name} ${item.last_name}`}</Text>
                                    <Text note>{`${item.phone_number}`}</Text>
                                </Body>
                                <Right>
                                    <Item>
                                        <Input
                                            placeholder="0"
                                            maxLength={3}
                                        />
                                        <Text>%</Text>
                                    </Item>
                                </Right>
                            </ListItem>
                        )
                    })
                }
            }

            return (
                <List>
                    {list(props)}
                </List>
            )
        }
        return (
            <Container>
                <Content padder>

                    <Form>
                        <Item picker>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="ios-arrow-down" />}
                                style={{ width: undefined }}
                                placeholder="Select a category"
                                placeholderStyle={{ color: "#bfc6ea" }}
                                selectedValue={this.state.selected2}
                                onValueChange={this.onValueChange2.bind(this)}
                            >
                                <Picker.Item label="General" value="key0" />
                                <Picker.Item label="Food and Drinks" value="key1" />
                                <Picker.Item label="Entertainment" value="key2" />
                                <Picker.Item label="Transportation" value="key3" />
                                <Picker.Item label="Groceries" value="key4" />
                                <Picker.Item label="Home" value="key5" />
                                <Picker.Item label="Life" value="key6" />
                                <Picker.Item label="Utilities" value="key7" />
                            </Picker>
                        </Item>
                    </Form>

                    <Item>
                        <Input placeholder="Description"
                            autoCorrect={false}
                            onChangeText={(description) => {
                                this.setState({ description })
                            }} />
                    </Item>

                    <Item>
                        <Icon active type="FontAwesome5" name='dollar-sign' />
                        <Input
                            keyboardType="numeric"
                            placeholder='Amount'

                            onChangeText={(amount) => {
                                amtRegex = /^([0-9]*.[0-9]?[0-9]?)?$/
                                if (amtRegex.test(amount)) {
                                    this.setState({ amount: amount });
                                    this.setState({ Error: '' })
                                } else {
                                    this.setState({ amount: amount });
                                    this.setState({ Error: 'Invalid input amount' })
                                }
                            }
                            }
                        />
                        <Text style={{ color: 'red' }}>
                            {this.state.Error}
                        </Text>
                    </Item>

                    <List>
                        <ListItem itemHeader>
                            <Left><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Contact Name</Text></Left>
                            <Right><Text style={{ fontWeight: 'bold', fontSize: 17 }}>Percent</Text></Right>
                        </ListItem>
                    </List>
                    <SelectedList
                        allContacts={this.state.selectedContacts}
                    />
                    <Text>Printing this out {this.state.selectedContacts[0].phone_number}</Text>

                    <Form style={{ marginTop: 30 }}>
                        <Textarea rowSpan={10} bordered placeholder="Type your notes here."
                            onChangeText={(notes) => {
                                this.setState({ notes: notes });
                            }}
                        />
                    </Form>

                    <Button dark style={{
                        marginTop: 20,
                        alignSelf: 'center'
                    }}>
                        <Icon name='ios-add' />
                        <Text>Add Receipt Image</Text>
                    </Button>

                    <Button primary small rounded
                        style={{
                            marginTop: 20,
                            marginBottom: 20,
                            alignSelf: 'center',
                            backgroundColor: 'darkblue',
                        }}
                        onPress={() => {

                            amtRegex = /^([0-9]*[.]*[0-9]?[0-9]?)?$/
                            if (amtRegex.test(this.state.amount) && this.state.amount !== "") {
                                Alert.alert(
                                    "Confirm submission",
                                    "Are you sure that the details and amounts have been typed correctly?",
                                    [
                                        {
                                            text: 'OK', onPress: () => this.props.navigation.navigate('Calculate',
                                                {
                                                    people: this.state.selectedContacts.length,
                                                    description: this.state.description,
                                                    amount: this.state.amount,
                                                    result: splitAmt,
                                                })
                                        },
                                        {
                                            text: 'Cancel',
                                            style: 'destructive',
                                        },

                                    ],
                                )
                            } else {
                                Alert.alert(
                                    "Warning!",
                                    "Please ensure that currency input is correct"
                                );
                            }
                        }
                        }
                    >
                        <Icon type='FontAwesome' name='dollar' />
                        <Text>SPLIT BILL</Text>
                        <Icon type='FontAwesome' name='dollar' />
                    </Button>

                </Content>

                <Footer>
                    <FooterTab>
                        <Button vertical onPress={() => this.props.navigation.navigate('Equally',
                            {
                                selectedContacts: this.state.selectedContacts,
                            })}>
                            <Icon type="FontAwesome5" name="equals" />
                            <Text>Equal</Text>
                        </Button>
                        <Button vertical active>
                            <Icon type="FontAwesome5" name="percentage" />
                            <Text>Percent</Text>
                        </Button>
                        <Button vertical>
                            <Icon type="FontAwesome5" name="not-equal" />
                            <Text>Unequal</Text>
                        </Button>
                        <Button vertical onPress={() => Alert.alert(
                            'Receipt Tab',
                            'By clicking this tab, the app will open the camera',
                        )}>
                            <Icon type="FontAwesome5" name="receipt" />
                            <Text>Receipt</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({


})


