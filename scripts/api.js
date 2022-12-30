import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppRegistry } from 'react-native-web';

const ascending = true

const STORAGE_LOCATION = "@ToDoList:task"
const COMPLETED_LOCATION = "@ToDoList:completed"
const BIN_LOCATION = "@ToDoList:bin"

export var _addData = async (data) => {
    try {
        let olddata = await AsyncStorage.getItem(STORAGE_LOCATION);
        if(olddata == null) {
            await AsyncStorage.setItem(
                STORAGE_LOCATION,
                "[]"
            );
        }
        
        await AsyncStorage.setItem(
            STORAGE_LOCATION,
            JSON.stringify([...JSON.parse(olddata), data])
        )
    } catch (error) {
    // Error saving data
    alert('error')
    }
};

export var _getData = async (i = -1) => {
    if(i >= 0) return JSON.parse(await _getData(-1))[i]
    try {
        let olddata = await AsyncStorage.getItem(STORAGE_LOCATION);
        if(olddata == null) {
            await AsyncStorage.setItem(
                STORAGE_LOCATION,
                "[]"
            );
            return "[]"
        }
        return olddata
    }
    catch(error) {
        alert(error)
    }
}

export var _editData = async (data, i) => {
    console.log("editing index: " + i)
    try {
        let olddata = await AsyncStorage.getItem(STORAGE_LOCATION);
        if(olddata == null) {
            await AsyncStorage.setItem(
                STORAGE_LOCATION,
                "[]"
            );
        }
        
        if(i == -1) {
            await AsyncStorage.setItem(
                STORAGE_LOCATION,
                JSON.stringify([...JSON.parse(olddata), data])
            )
        } else {
            console.log("REPLACING DATA")
            let newdata = JSON.parse(olddata)
            newdata[i] = data
            await AsyncStorage.setItem(
                STORAGE_LOCATION,
                JSON.stringify(newdata)
            )
            console.log(await _getData())
        }
    } catch (error) {
    // Error saving data
    alert('error')
    }
}

export var _setData = async (data) => {
    await AsyncStorage.setItem(
        STORAGE_LOCATION,
        data
    );
}

export var _resetData = async () => {
    _setData("[]")
}



export async function setProgress(i, set=0) {
    let olddata = JSON.parse(await _getData())
    let newdata = [...olddata]
    newdata[i].progress.current = set
    console.log("Set Data to ", newdata[i])
    await _editData(newdata[i], i)
}
export async function changeProgress(i, change=1) {
    let olddata = JSON.parse(await _getData())
    let newdata = [...olddata]
    newdata[i].progress.current += 1
    await _editData(newdata[i], i)
}
export async function getProgress(i) {
    JSON.parse(await _getData())[i]

}




export async function sortData() {
    let data = JSON.parse(await _getData())
    console.log(data)
    data.sort((a,b) => {return a ? (new Date(a.date.due_date).getTime() - new Date(b.date.due_date).getTime()) * (ascending * 2 - 1) : 0})
    await _setData(JSON.stringify(data))
}
