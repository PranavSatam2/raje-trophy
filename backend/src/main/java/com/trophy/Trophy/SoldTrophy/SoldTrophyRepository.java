package com.trophy.Trophy.SoldTrophy;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SoldTrophyRepository extends MongoRepository<SoldTrophy, String> {

    // Get summary for all trophies
    @Query("{ }")
    @Aggregation(pipeline = {
            "{ $group: { _id: '$trophyCode', totalQuantity: { $sum: '$soldQuantity' }, totalPrice: { $sum: '$soldCurrentQuantityPrice' } } }",
            "{ $project: { trophyCode: '$_id', totalQuantity: 1, totalPrice: 1, _id: 0 } }"
    })
    List<TrophySalesSummary> getTotalSalesSummary();

    // Get summary for a single trophy code
    @Query("{ 'trophyCode': ?0 }")
    @Aggregation(pipeline = {
            "{ $match: { trophyCode: '?0' } }",
            "{ $group: { _id: '$trophyCode', totalQuantity: { $sum: '$soldQuantity' }, totalPrice: { $sum: '$soldCurrentQuantityPrice' } } }",
            "{ $project: { trophyCode: '$_id', totalQuantity: 1, totalPrice: 1, _id: 0 } }"
    })
    TrophySalesSummary getTotalSalesSummaryByTrophyCode(String trophyCode);

    @Query(value = """
        [
          {
            $group: {
              _id: { trophyCode: "$trophyCode", month: { $substr: ["$soldDate", 0, 7] } },
              totalQuantity: { $sum: "$soldQuantity" },
              totalPrice: { $sum: "$soldCurrentQuantityPrice" }
            }
          },
          {
            $project: {
              trophyCode: "$_id.trophyCode",
              month: "$_id.month",
              totalQuantity: 1,
              totalPrice: 1,
              _id: 0
            }
          },
          { $sort: { month: 1, trophyCode: 1 } }
        ]
    """)
    List<TrophySalesSummary> getMonthlySalesSummary();
}

