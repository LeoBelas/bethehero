import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'

import logoImg from '../../assets/logo.png'
import styles from './styles'
import api from '../../services/api'

export default function Incidents() {
  const navigation = useNavigation();
  const [incidents, setIncidents] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)

  function navigateToDetail(incident){
    navigation.navigate('Detail',{incident})
  }

  async function loadIncidents(){
    if(loading){
      return;
    }
    if(total > 0 && incidents.length == total){
      return
    }
    setLoading(true)

    const response = await api.get('incidents',{params: {page}});
    setIncidents([...incidents, ...response.data]);
    setTotal(response.headers['X-Total-Count'])
    setPage(page + 1)
    setLoading(false)
  }  
  useEffect(()=>{
    loadIncidents()
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
           Total de <Text style={styles.headerTextBold}>{total} casos</Text>
        </Text>
      </View>
      <Text style={styles.title}>Bem-vindo</Text>
      <Text style={styles.description}>Description</Text>

      <FlatList 
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator = {false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({item: incident})=>(
          <View style={styles.incident}>
          <Text style={[styles.incindentProperty, {marginTop: 0}]}>ONG:</Text>
          <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>

          <Text style={styles.incindentProperty}>CASO:</Text>
          <Text style={styles.incidentValue}>{incident.description}</Text>

          <Text style={styles.incindentProperty}>VALOR:</Text>
          <Text style={styles.incidentValue}>
            {Intl.NumberFormat('pt-BR',{
              style:'currency',currency:'BRL'
              }).format(incident.value)}
          </Text>

          <TouchableOpacity style={styles.detailsButton} onPress={()=>navigateToDetail(incident)}>
            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#E02041" />
          </TouchableOpacity>
        </View>          
        )}
      />

    
    </View>
  );
}