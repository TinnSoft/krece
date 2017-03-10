<?php

namespace App\Repositories;
use Auth;
use Illuminate\Support\Facades\DB;

class ProductRepository
{
    public function getRemisionList($product_id)
    {
        return
            DB::table('remision')
            ->join('contact', 'remision.customer_id', '=', 'contact.id')
            ->join('remision_detail', 'remision_detail.remision_id', '=', 'remision.id')
            ->join('remision_status', 'remision_status.id', '=', 'remision.status_id')
            ->where('remision.account_id',Auth::user()->account_id)
            ->where('remision.status_id',1)
            ->where('remision.isDeleted',0)
            ->where('remision_detail.product_id',$product_id)
            ->select('remision.resolution_id',
            'contact.name',
            'remision.date',
            'remision.due_date',
            'remision_status.description as status_description',
            'remision.status_id',
            'remision.total',
            'remision.public_id'
            )
            ->get();
    }

     public function getEstimateList($product_id)
    {
        return
            DB::table('estimate')
            ->join('contact', 'estimate.customer_id', '=', 'contact.id')
            ->join('estimate_detail', 'estimate_detail.estimate_id', '=', 'estimate.id')
            ->where('estimate.account_id',Auth::user()->account_id)
            ->where('estimate.isDeleted',0)
             ->where('estimate_detail.product_id',$product_id)
            ->select('estimate.resolution_id',
            'contact.name',
            'estimate.date',
            'estimate.due_date',
            'estimate.total',
            'estimate.public_id'
            )
            ->get();
    }
}