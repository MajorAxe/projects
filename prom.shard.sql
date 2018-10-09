ALTER SESSION SET CURRENT_SCHEMA = eaist_shard_1_3
ALTER SESSION SET CURRENT_SCHEMA = eaist_users
ALTER SESSION SET CURRENT_SCHEMA = eaist_nsi

select distinct s.id SPGZ_ID, s.entity_id SPGZ_ENTITY_ID, s.name SPGZ_NAME, c.name CHARACTERISTIC_NAME, ce.value CHARACTERISTIC_VALUE
from eaist_nsi.n_spgz s
join (select distinct dps.spgz_id 
      from EAIST_SHARD_1_3.D_DETAILED_PURCHASE_VERSION dpv
      join EAIST_SHARD_1_3.D_DETAILED_PURCHASE_SPEC dps on dpv.id=dps.dpurchase_id
      where dpv.deleted_date is null and dpv.created_date>trunc(sysdate)-3+17/24) dps on s.id=dps.spgz_id
join eaist_nsi.n_spgz_characteristic_spgz scs on s.id=scs.spgz_id
join eaist_nsi.n_characteristic_spgz cs on scs.characteristic_spgz_id=cs.id
join eaist_nsi.n_characteristic_kpgz ck on cs.characteristic_kpgz_id=ck.id
join eaist_nsi.n_characteristic c on ck.characteristic_id=c.id and lower(c.name) like 'лекарственная форма'
join eaist_nsi.n_characteristic_spgz_enum ce on cs.id=ce.characteristic_spgz_id
left join (select ecs.spgz_id, ecv.charact_id, lower(ecv.ch_value) ch_value
            from eaist_nsi.N_EMIAS_CONVERSION_SPR ecs 
            join eaist_nsi.N_EMIAS_CONVERSION_VALUES ecv on ecs.id=ecv.id_spr and ecs.deleted_date is null) emias 
on s.entity_id=emias.spgz_id and c.id=emias.charact_id and lower(ce.value)=emias.ch_value
where s.deleted_date is null and lower(COMMENT_) like '%загружено из емиас%'
and emias.spgz_id is null
