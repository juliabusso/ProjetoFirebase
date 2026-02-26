import { Text,StyleSheet,View,Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {auth} from "../services/firebaseConfig"
import { deleteUser } from "firebase/auth";
import { Alert } from "react-native";

export default function Home() {
    const router = useRouter()//Hook de navegação

    const realizarLogoff = async () =>{
        await AsyncStorage.removeItem("@user")//Limpa o usuário do Async
        router.replace("/")
    }
const excluirConta = () => {
    Alert.alert(
        "ATENÇÃO",
        "Deseja realmente excluir sua conta? Essa ação é irreversível!",
        [
            { text: "Cancelar", style: "cancel" },
            {
                text: "Excluir",
                onPress: async () => {
                    try {
                        const user = auth.currentUser;

                        if (user) {
                            await deleteUser(user);
                            await AsyncStorage.removeItem("@user"); // Limpa o usuário do Async
                            Alert.alert("Sucesso,", "Conta excluída com sucesso!");
                            router.replace("/");
                        } else {
                            Alert.alert("Erro", "Nenhum usuário logado.");
                        }

                    } catch (error) {
                        console.log("Erro ao excluir conta: ", error);
                        Alert.alert("Erro", "Não foi possível excluir a conta. Tente novamente mais tarde.");
                    }
                }
            }
        ]
    );
};
    return (
        <View style={styles.main}>
            <Text>Tela Home</Text>
            <Button title="Realizar logoff" onPress={realizarLogoff}/>
            <Button title="Excluir conta" onPress={excluirConta} color="red"/>
        </View>

    )
}
const styles = StyleSheet.create({
    main:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})